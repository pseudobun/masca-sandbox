import { useMascaStore } from '@/app/stores/masca';
import { toast } from 'sonner';
import {
  availableCredentialStores,
  isError,
  type AvailableCredentialStores,
  type SupportedProofFormats,
} from '@blockchain-lab-um/masca-connector';
import { Button, Checkbox, Divider, Textarea } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { capitalizeWord } from '@/lib/utils';

const proofFormats: Record<string, SupportedProofFormats> = {
  JWT: 'jwt',
  'JSON-LD': 'lds',
  EIP712Signature: 'EthereumEip712Signature2021',
};

export default function CreateCredential() {
  const [credentialPayload, setCredentialPayload] = useState('');
  const [isSave, setIsSave] = useState(false);
  const [saveToSnap, setSaveToSnap] = useState(false);
  const [saveToCeramic, setSaveToCeramic] = useState(false);
  const [saving, setSaving] = useState(false);
  const { did, mascaApi } = useMascaStore((state) => ({
    did: state.currDID,
    mascaApi: state.mascaApi,
    availableCredentialStores: state.availableCredentialStores,
  }));

  const handleSaveVc = async () => {
    if (!mascaApi) return;
    setSaving(true);
    const vcObj = JSON.parse(credentialPayload);
    if (isSave) {
      console.info('Saving to snap: ', saveToSnap);
      console.info('Saving to ceramic: ', saveToCeramic);
    }
    const res = await mascaApi.createCredential({
      minimalUnsignedCredential: vcObj,
      //   proofFormat: proofFormats[format],
      options: {
        save: isSave,
        store: saveToSnap ? 'snap' : saveToCeramic ? 'ceramic' : undefined,
      },
    });
    if (isError(res)) {
      console.error(res);
      setSaving(false);
    }
    console.log('Credential created', res);
    setSaving(false);
  };

  useEffect(() => {
    const payload = JSON.stringify(
      {
        type: ['VerifiableCredential', 'PseudobunsPlaygroundCredential'],
        credentialSubject: {
          id: did,
          type: 'Pseudobun Playground Dev',
        },
        credentialSchema: {
          id: 'https://beta.api.schemas.serto.id/v1/public/program-completion-certificate/1.0/json-schema.json',
          type: 'JsonSchemaValidator2018',
        },
        '@context': [
          'https://www.w3.org/2018/credentials/v1',
          'https://beta.api.schemas.serto.id/v1/public/program-completion-certificate/1.0/ld-context.json',
        ],
      },
      null,
      2
    );
    setCredentialPayload(payload);
  }, [did]);
  return (
    <div className="flex flex-col gap-y-2">
      <Textarea
        className="scrollbar-hide"
        value={credentialPayload}
        onChange={(e) => setCredentialPayload(e.target.value)}
      />
      <Checkbox isSelected={isSave} onValueChange={setIsSave}>
        Save
      </Checkbox>
      {isSave && (
        <div className="flex flex-col gap-y-2">
          {availableCredentialStores.map((store) => (
            <Checkbox
              key={store}
              isSelected={store === 'snap' ? saveToSnap : saveToCeramic}
              onValueChange={
                store === 'snap' ? setSaveToSnap : setSaveToCeramic
              }
            >
              {capitalizeWord(store)}
            </Checkbox>
          ))}
        </div>
      )}
      <Button
        className="w-fit"
        color="primary"
        isLoading={saving}
        onClick={() =>
          toast.promise(handleSaveVc(), {
            loading: isSave
              ? 'Creating and saving credential'
              : 'Creating credential',
            success: isSave
              ? 'Credential saved'
              : 'Credential created, check console logs',
            error: 'Error creating credential',
          })
        }
      >
        Create
      </Button>
    </div>
  );
}
