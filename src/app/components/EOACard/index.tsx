'use client';
import { useMascaStore } from '@/app/stores/masca';
import { enableMasca, isError } from '@blockchain-lab-um/masca-connector';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
} from '@nextui-org/react';
import { useEffect } from 'react';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useChainId,
  useSwitchChain,
} from 'wagmi';

export default function EOACard() {
  const { disconnect } = useDisconnect();
  const { address, isConnected, status: accountStatus, chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { status, error } = useConnect();
  const {
    setMascaApi,
    mascaApi,
    setCurrentDid,
    setCurrentMethod,
    setAvailableMethods,
    setAvailableCredentialStores,
    setPopups,
  } = useMascaStore((state) => ({
    mascaApi: state.mascaApi,
    setMascaApi: state.setMascaApi,
    setCurrentDid: state.setCurrDID,
    setCurrentMethod: state.setCurrDIDMethod,
    setAvailableMethods: state.setAvailableMethods,
    setPopups: state.setPopups,
    setAvailableCredentialStores: state.setAvailableCredentialStores,
  }));

  const statusColor: Record<
    string,
    'default' | 'success' | 'danger' | 'warning' | 'primary' | 'secondary'
  > = {
    error: 'danger',
    idle: 'success',
    pending: 'warning',
    success: 'success',
    default: 'default',
  };

  useEffect(() => {
    if (!address) return;
    handleEnableMasca().catch(async (err) => {
      if (err.message.toLowerCase().includes('unsupported network')) {
        await switchChainAsync({ chainId: 1 });
        await handleEnableMasca();
        return;
      }
      console.error(err);
    });
  }, [isConnected, address]);

  const handleEnableMasca = async () => {
    if (accountStatus !== 'connected') {
      return;
    }

    const res = await enableMasca(address);
    if (!res.success) {
      console.error(res.error);
      return;
    }
    const mascaApi = res.data.getMascaApi();
    setMascaApi(mascaApi);
    const did = await mascaApi.getDID();
    if (isError(did)) {
      console.log("Couldn't get DID");
      throw new Error(did.error);
    }
    const availableMethods = await mascaApi.getAvailableMethods();
    if (isError(availableMethods)) {
      console.log("Couldn't get available methods");
      throw new Error(availableMethods.error);
    }
    const method = await mascaApi.getSelectedMethod();
    if (isError(method)) {
      console.log("Couldn't get selected method");
      throw new Error(method.error);
    }
    const accountSettings = await mascaApi.getAccountSettings();
    if (isError(accountSettings)) {
      console.log("Couldn't get account settings");
      throw new Error(accountSettings.error);
    }
    const snapSettings = await mascaApi.getSnapSettings();
    if (isError(snapSettings)) {
      console.log("Couldn't get snap settings");
      throw new Error(snapSettings.error);
    }
    setCurrentDid(did.data);
    setAvailableMethods(availableMethods.data);
    setCurrentMethod(method.data);
    setAvailableCredentialStores(accountSettings.data.ssi.storesEnabled);
    setPopups(snapSettings.data.dApp.disablePopups);
  };
  return (
    <div hidden={accountStatus !== 'connected'}>
      <Card>
        <CardHeader>
          <p className="text-xl">EOA Info</p>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-y-2">
          <div className="flex flex-col gap-y-4">
            <Chip color={accountStatus === 'connected' ? 'success' : 'danger'}>
              {accountStatus}
            </Chip>
            <p>Address: {address}</p>
            <p>Chain ID: {chainId}</p>
            <Chip color={statusColor[status] || 'default'}>{status}</Chip>
            <div>{error?.message}</div>
          </div>
        </CardBody>
        <Divider />
        <CardFooter className="flex gap-x-2">
          <div className="flex">
            {accountStatus === 'connected' && (
              <Button type="button" color="danger" onClick={() => disconnect()}>
                Disconnect
              </Button>
            )}
          </div>
          <div hidden={mascaApi !== null}>
            <Button color="primary" onClick={() => handleEnableMasca()}>
              Enable Masca
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
