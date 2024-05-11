import { useMascaStore } from '@/app/stores/masca';
import type { QueryCredentialsRequestResult } from '@blockchain-lab-um/masca-connector';
import { Button, Textarea } from '@nextui-org/react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function QueryCredentials() {
  const [credentials, setCredentials] = useState<
    QueryCredentialsRequestResult[]
  >([]);
  const [credential, setCredential] = useState('');
  const [querying, setQuerying] = useState(false);
  const { mascaApi } = useMascaStore((state) => ({
    mascaApi: state.mascaApi,
  }));

  const handleQueryCredentials = async () => {
    setQuerying(true);
    if (!mascaApi) {
      toast.error('Masca API is not initialized');
      return;
    }
    const queryCredentialsResult = await mascaApi?.queryCredentials();
    if (!queryCredentialsResult.success) {
      toast.error(queryCredentialsResult.error);
      return;
    }
    setCredentials(queryCredentialsResult.data);
  };
  return (
    <div className="flex flex-col gap-y-2">
      <Textarea
        contentEditable={false}
        className="scrollbar-hide"
        value={credential}
      />
      <Button
        className="w-fit"
        color="primary"
        isLoading={querying}
        onClick={() =>
          handleQueryCredentials().finally(() => {
            setQuerying(false);
          })
        }
      >
        Query Credentials
      </Button>
      {credentials.map((credential) => (
        <div className="flex items-center gap-x-2" key={credential.metadata.id}>
          <p className="w-full">{credential.metadata.id}</p>
          <Button
            color="secondary"
            variant="light"
            onClick={() => {
              setCredential(JSON.stringify(credential, null, 2));
            }}
          >
            Examine in top textarea
          </Button>
        </div>
      ))}
    </div>
  );
}
