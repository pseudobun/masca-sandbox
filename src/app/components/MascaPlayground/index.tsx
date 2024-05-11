'use client';
import { useMascaStore } from '@/app/stores/masca';
import { Accordion, AccordionItem } from '@nextui-org/react';
import CreateCredential from '../CreateCredential';
import QueryCredentials from '../QueryCredentials';
import DeleteCredential from '../DeleteCredential';

export default function MascaPlayground() {
  const { mascaApi } = useMascaStore((state) => ({
    mascaApi: state.mascaApi,
  }));
  return (
    <div hidden={!mascaApi}>
      <Accordion keepContentMounted>
        <AccordionItem title="Create Credential">
          <CreateCredential />
        </AccordionItem>
        <AccordionItem title="Query Credentials">
          <QueryCredentials />
        </AccordionItem>
        <AccordionItem title="Delete Credential">
          <DeleteCredential />
        </AccordionItem>
      </Accordion>
    </div>
  );
}
