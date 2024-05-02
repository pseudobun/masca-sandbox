'use client';
import { Button } from '@nextui-org/react';
import { useAccount, useConnect } from 'wagmi';

export default function ConnectWallet() {
  const account = useAccount();
  const { connectors, connect } = useConnect();
  if (account.status === 'connected') {
    return null;
  }
  return (
    <div className="flex gap-x-2">
      {connectors.map((connector) => {
        if (
          connector.id === 'io.metamask' ||
          connector.id === 'io.metamask.flask'
        ) {
          return (
            <Button
              key={connector.uid}
              color="primary"
              isLoading={account.status === 'connecting'}
              onClick={() => connect({ connector })}
              type="button"
            >
              Connect {connector.name}
            </Button>
          );
        }
      })}
    </div>
  );
}
