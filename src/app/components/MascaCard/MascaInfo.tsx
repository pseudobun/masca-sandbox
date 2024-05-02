import { useMascaStore } from '@/app/stores/masca';

export default function MascaInfo() {
  const { state } = useMascaStore((state) => ({
    state: state,
  }));
  return (
    <div>
      <p>Current DID: {state.currDID}</p>
      <p>Current DID Method: {state.currDIDMethod}</p>
      <p>Current Credential Store: {state.currCredentialStore}</p>
    </div>
  );
}
