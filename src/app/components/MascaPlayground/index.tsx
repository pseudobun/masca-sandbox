'use client';
import { useMascaStore } from '@/app/stores/masca';
import { Accordion, AccordionItem } from '@nextui-org/react';
import CreateCredential from '../CreateCredential';

export default function MascaPlayground() {
  const { mascaApi } = useMascaStore((state) => ({
    mascaApi: state.mascaApi,
  }));
  return (
    <div hidden={!mascaApi}>
      <Accordion>
        <AccordionItem key="1" title="Create Credential">
          <CreateCredential />
        </AccordionItem>
        <AccordionItem key="2" title="Create VP">
          TODO: create VP
        </AccordionItem>
        <AccordionItem key="3" title="TODO">
          TODO: ...
        </AccordionItem>
      </Accordion>
    </div>
  );
}
