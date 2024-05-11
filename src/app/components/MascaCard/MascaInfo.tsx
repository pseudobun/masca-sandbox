import { useMascaStore } from '@/app/stores/masca';
import { formatDid } from '@/app/utils/format';
import { Tooltip } from '@nextui-org/react';

export default function MascaInfo() {
  const { state } = useMascaStore((state) => ({
    state: state,
  }));
  return (
    <div>
      <Tooltip content={state.currDID || ''}>
        <p>Current DID: {formatDid(state.currDID || '')}</p>
      </Tooltip>
      <p>Current DID Method: {state.currDIDMethod}</p>
      <p>Current Credential Store: {state.currCredentialStore}</p>
    </div>
  );
}
