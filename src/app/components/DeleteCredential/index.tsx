import { useMascaStore } from '@/app/stores/masca';
import { Button, Checkbox, Input } from '@nextui-org/react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function DeleteCredential() {
  const [credentialId, setCredentialId] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [fromSnap, setFromSnap] = useState(true);
  const [fromCeramic, setFromCeramic] = useState(true);
  const { mascaApi } = useMascaStore((state) => ({
    mascaApi: state.mascaApi,
  }));
  const handleDeleteCredential = async () => {
    setDeleting(true);
    if (!mascaApi) {
      toast.error('Masca API is not initialized');
      return;
    }
    let deleteCredentialResult;
    if (fromSnap && fromCeramic) {
      deleteCredentialResult = await mascaApi.deleteCredential(credentialId);
    }

    if (fromSnap && !fromCeramic) {
      deleteCredentialResult = await mascaApi.deleteCredential(credentialId, {
        store: 'snap',
      });
    }

    if (!fromSnap && fromCeramic) {
      deleteCredentialResult = await mascaApi.deleteCredential(credentialId, {
        store: 'ceramic',
      });
    }

    if (!deleteCredentialResult!.success) {
      toast.error(
        `${
          deleteCredentialResult!.error
        } - Hint: Make sure you are deleting from the correct store`
      );
      return;
    }
    toast.success('Credential deleted');
  };
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-x-2">
        <Checkbox isSelected={fromSnap} onValueChange={setFromSnap}>
          Snap
        </Checkbox>
        <Checkbox isSelected={fromCeramic} onValueChange={setFromCeramic}>
          Ceramic
        </Checkbox>
      </div>
      <div className="flex gap-x-2">
        <Input
          className="w-full"
          placeholder="e.g. 5f16b30602ccab1d7f34069a59bd2da7f808805479d6ad5a2cf4d05198bbafe5"
          onValueChange={(e) => {
            setCredentialId(e);
          }}
        />
        <Button
          className="w-fit"
          variant="light"
          color="danger"
          isLoading={deleting}
          isDisabled={!credentialId || credentialId === ''}
          onClick={() =>
            handleDeleteCredential().finally(() => setDeleting(false))
          }
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
