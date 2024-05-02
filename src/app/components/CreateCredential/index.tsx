import { useMascaStore } from '@/app/stores/masca';
import {
  isError,
  type AvailableCredentialStores,
  type SupportedProofFormats,
} from '@blockchain-lab-um/masca-connector';
import { Button, Divider, Textarea } from '@nextui-org/react';
import { useEffect, useState } from 'react';

const proofFormats: Record<string, SupportedProofFormats> = {
  JWT: 'jwt',
  'JSON-LD': 'lds',
  EIP712Signature: 'EthereumEip712Signature2021',
};

export default function CreateCredential() {
  const [credentialPayload, setCredentialPayload] = useState('');
  const [saving, setSaving] = useState(false);
  const { did, mascaApi } = useMascaStore((state) => ({
    did: state.currDID,
    mascaApi: state.mascaApi,
  }));

  const handleSaveVc = async () => {
    if (!mascaApi) return;
    setSaving(true);
    const vcObj = JSON.parse(credentialPayload);
    const res = await mascaApi.createCredential({
      minimalUnsignedCredential: vcObj,
      //   proofFormat: proofFormats[format],
      options: {
        save: true,
        // save
        // store: selectedItems.map((store) =>
        //   store.toLowerCase()
        // ) as AvailableCredentialStores[],
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
        value={credentialPayload}
        onChange={(e) => setCredentialPayload(e.target.value)}
      />
      <Button color="primary" isLoading={saving} onClick={() => handleSaveVc()}>
        Create
      </Button>
    </div>
  );
}
