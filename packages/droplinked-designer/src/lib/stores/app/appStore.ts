import { IUser } from 'lib/models/user'
import { appDevelopment } from 'lib/utils/app/variables'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { ICartStore, IShop } from './interfaces'
import { shopStates } from './shopModel'

interface IupdateState {
    state: string
    value: any
}
interface Icart {
    [propname: string]: ICartStore
}

export interface IAppStore {
    states: {
        cart: Icart;
        user: { [shopName: string]: { token: string; user: IUser } } | null;
        shop: IShop;
    };
    methods: {
        updateState: (props: IupdateState) => void;
    };
}

const states = (set: any): IAppStore => ({
    states: {
        cart: {} as Icart,
        user: null,
        shop: shopStates({} as IShop),
    },
    methods: {
        updateState: ({ state, value }: IupdateState) => {
            set((prev: IAppStore) => ({
                ...prev,
                states: {
                    ...prev.states,
                    [state]: value
                }
            }))
        },
    }
})

export const appStorePersistName = "appStoreStorage"

const _persist = persist(states, {
    name: appStorePersistName,
    partialize: (state) => ({
        states: state.states
    })
})

const useAppStore = appDevelopment ? create<IAppStore>()(devtools(_persist, { name: "droplinked" })) : create<IAppStore>()(_persist)

export default useAppStore