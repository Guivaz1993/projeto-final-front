import "./style.css";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { getItem } from "../../../utils/Storage";

import CardListDebts from "../CardListDebts";
import CardListClients from "../CardListClients";
import CardSumDebts from "../CardSumDebts";

import {
  sumDebts,
  countDebts,
  listPaidDebts,
  listExpiredDebts,
  listPendingDebts
} from '../../../services/debtService';
import {
  countClients,
  listDefaulterClients,
  listDebtFreeClients
} from '../../../services/clientService';

function Resume() {
  const [sumPaidDebtsData, setSumPaidDebts] = useState([]);
  const [sumExpiredDebtsData, setSumExpiredDebts] = useState([]);
  const [sumPendingDebtsData, setSumPendingDebts] = useState([]);

  const [countPaidDebtsData, setCountPaidDebts] = useState([]);
  const [countExpiredDebtsData, setCountExpiredDebts] = useState([]);
  const [countPendingDebtsData, setCountPendingDebts] = useState([]);
  const [countDefaulterClientsData, setCountDefaulterClients] = useState([]);
  const [countDebtFreeClientsData, setCountDebtFreeClients] = useState([]);

  const [listPaidDebtsData, setListPaidDebts] = useState([]);
  const [listExpiredDebtsData, setListExpiredDebts] = useState([]);
  const [listPendingDebtsData, setListPendingDebts] = useState([]);
  const [listDefaulterClientData, setListDefaulterClient] = useState([]);
  const [listDebtFreeClientData, setListDebtFreeClient] = useState([]);

  const token = getItem('token');

  useEffect(() => {
    loadHomeData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadHomeData() {
    try {
      const sumD = await sumDebts(token);
      // verifyOk(sumD.ok, sumD.data);
      setSumExpiredDebts(sumD.ok?sumD.data.filter((iten)=>iten.status==="Vencida")[0].sum:0);
      setSumPendingDebts(sumD.ok? sumD.data.filter((iten)=>iten.status==="Pendente")[0].sum:0);
      setSumPaidDebts(sumD.ok?sumD.data.filter((iten)=>iten.status==="Pago")[0].sum:0);

      const countD = await countDebts(token);
      // verifyOk(countD.ok, countD.data);
      console.log(countD,"conta debts")
      setCountExpiredDebts(countD.ok? countD.data.filter((iten)=>iten.status==="Vencida")[0].count:0);
      setCountPendingDebts(countD.ok?countD.data.filter((iten)=>iten.status==="Pendente")[0].count:0);
      setCountPaidDebts(countD.ok? countD.data.filter((iten)=>iten.status==="Pago")[0].count:0);

      const countC = await countClients(token);
      console.log(countC,"conta clientes")
      console.log(countC.data.filter((iten)=>iten.status!=="Inadimplente").length)
        // verifyOk(countC.ok, countC.data);
        setCountDefaulterClients( countC.data[0]?countC.data.filter((iten)=>iten.status==="Inadimplente")[0].count:0);
        setCountDebtFreeClients(countC.data.filter((iten)=>iten.status!=="Inadimplente").length?countC.data.filter((iten)=>iten.status!=="Inadimplente")[0].count:0);
      

      const listPaD = await listPaidDebts(token);
      // verifyOk(listPaD.ok, listPaD.data);
      console.log(listPaD.data)
      setListPaidDebts(listPaD.ok? listPaD.data:[]);
      
      const listED = await listExpiredDebts(token);
      // verifyOk(listED.ok, listED.data);
      console.log(listED.ok)
      setListExpiredDebts(listED.ok?listED.data:[]);
      
      const listPeD = await listPendingDebts(token);
      console.log(listPeD)
      // verifyOk(listPeD.ok, listPeD.data);
      setListPendingDebts(listPeD.ok? listPeD.data:[]);
      
      const listDC = await listDefaulterClients(token);
      console.log(listDC)
      // verifyOk(listDC.ok, listDC.data);
      setListDefaulterClient(listDC.ok? listDC.data:[]);
      
      const listDFC = await listDebtFreeClients(token);
      console.log(listDFC)
      // verifyOk(listDFC.ok, listDFC.data);
      setListDebtFreeClient(listDFC.ok? listDFC.data:[]);
    } catch (error) {
      return toast.error(error.message);
    }
  }

  // function verifyOk(ok, data) {
  //   if (!ok) {
  //     return toast.warning(data);
  //   }
  // }

  return (
    <main className="ResumeContainer">
      <section className="SumCards">
        <CardSumDebts status="paid" sum={sumPaidDebtsData} />
        <CardSumDebts status="expired" sum={sumExpiredDebtsData} />
        <CardSumDebts status="pending" sum={sumPendingDebtsData} />
      </section>
      <section className="DebtsCards">
        <CardListDebts status="paid" list={listPaidDebtsData} count={countPaidDebtsData} />
        <CardListDebts status="expired" list={listExpiredDebtsData} count={countExpiredDebtsData} />
        <CardListDebts status="pending" list={listPendingDebtsData} count={countPendingDebtsData} />
      </section>
      <section className="ClientsCards">
        <CardListClients status="defaulter" list={listDefaulterClientData} count={countDefaulterClientsData} />
        <CardListClients status="debt-free" list={listDebtFreeClientData} count={countDebtFreeClientsData} />
      </section>
    </main>
  );
}

export default Resume;