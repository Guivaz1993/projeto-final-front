import { useState } from 'react';

function useUserProvider() {
    const [openModalClient, setOpenModalClient] = useState(false);
    const [openModalClientUpdate, setOpenModalClientUpdate] = useState(false);
    const [isActive, setIsActive] = useState("home")
    const [title, setTitle] = useState("Home")
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [currentClient, setCurrentClient] = useState({});
    const [openModalCreateDebt, setOpenModalCreateDebt] = useState(false);
    const [clientsList, setClientsList] = useState([
    ]);
    const [debtsList, setDebtsList] = useState([
    ]);
    const [openModalUpdateDebt, setOpenModalUpdateDebt] = useState(false);
    const [openModalDebtDetails, setOpenModalDebtDetails] = useState(false);
    const [openModalDelDebt, setOpenModalDelDebt] = useState(false);
    const [currentDebt, setCurrentDebt] = useState({});

    const [searchClients, setSearchClients] = useState("");
    const [searchDebts, setSearchDebts] = useState("");

    return {
        openModalClient, setOpenModalClient,
        openModalClientUpdate, setOpenModalClientUpdate,
        isActive, setIsActive,
        title, setTitle,
        openEdit, setOpenEdit,
        openModalUpdate, setOpenModalUpdate,
        currentClient, setCurrentClient,
        openModalCreateDebt, setOpenModalCreateDebt,
        clientsList, setClientsList,
        debtsList, setDebtsList,
        openModalUpdateDebt, setOpenModalUpdateDebt,
        openModalDebtDetails, setOpenModalDebtDetails,
        openModalDelDebt, setOpenModalDelDebt,
        currentDebt, setCurrentDebt,
        searchClients, setSearchClients,
        searchDebts, setSearchDebts
    }
}

export default useUserProvider;