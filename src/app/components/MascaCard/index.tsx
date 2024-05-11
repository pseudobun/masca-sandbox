'use client';

import { type MascaStore, useMascaStore } from '@/app/stores/masca';
import {
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from '@nextui-org/react';
import { useAccount } from 'wagmi';
import MascaInfo from './MascaInfo';

export default function MascaCard() {
  const { currentDid } = useMascaStore((state: MascaStore) => ({
    currentDid: state.currDID,
  }));
  const { status } = useAccount();
  return (
    <div
      className="h-full"
      hidden={
        status !== 'connected' ||
        currentDid === null ||
        currentDid === undefined
      }
    >
      <Card className="flex min-h-full">
        <CardHeader>
          <p className="text-xl">Masca Info</p>
        </CardHeader>
        <Divider />
        <CardBody>
          <MascaInfo />
        </CardBody>
      </Card>
    </div>
  );
}
