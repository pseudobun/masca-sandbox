import type {
  AvailableCredentialStores,
  MascaApi,
  QueryCredentialsRequestResult,
} from '@blockchain-lab-um/masca-connector';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

export interface MascaStore {
  mascaApi: MascaApi | null;
  availableMethods: string[];
  currDIDMethod: string | undefined;
  currCredentialStore: AvailableCredentialStores | undefined;
  currDID: string | null;
  vcs: QueryCredentialsRequestResult[];
  availableCredentialStores: Record<string, boolean>;
  popups: boolean | undefined;

  setAvailableCredentialStores: (
    availableCredentialStores: Record<string, boolean>
  ) => void;
  setMascaApi: (mascaApi: MascaApi) => void;
  setAvailableMethods: (availableMethods: string[]) => void;
  setCurrDIDMethod: (currDIDMethod: string) => void;
  setCurrCredentialStore: (
    currCredentialStore: AvailableCredentialStores
  ) => void;
  setCurrDID: (currDID: string) => void;
  setVcs: (vcs: QueryCredentialsRequestResult[]) => void;
  setPopups: (enabled: boolean) => void;
}

export const mascaStoreInitialState = {
  mascaApi: null,
  availableMethods: [],
  currDIDMethod: undefined,
  currCredentialStore: undefined,
  currDID: null,
  vcs: [],
  availableCredentialStores: { snap: true, ceramic: true },
  popups: undefined,
};

export const useMascaStore = createWithEqualityFn<MascaStore>()(
  (set) => ({
    ...mascaStoreInitialState,
    setAvailableCredentialStores: (
      availableCredentialStores: Record<string, boolean>
    ) => set({ availableCredentialStores }),
    setMascaApi: (mascaApi: MascaApi) => set({ mascaApi }),
    setAvailableMethods: (availableMethods: string[]) =>
      set({ availableMethods }),
    setCurrDIDMethod: (currDIDMethod: string) => set({ currDIDMethod }),
    setCurrCredentialStore: (
      currCredentialStore: AvailableCredentialStores
    ) => set({ currCredentialStore }),
    setCurrDID: (currDID: string) => set({ currDID }),
    setVcs: (vcs: QueryCredentialsRequestResult[]) => set({ vcs }),
    setPopups: (enabled: boolean) => set({ popups: enabled }),
  }),
  shallow
);