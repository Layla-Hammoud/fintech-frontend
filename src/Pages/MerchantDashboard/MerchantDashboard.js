import CardBalance from "../../Components/CardBalance";
import { Box } from "@mui/material";
import TransactionStatistic from '../../Components/TransactionStatistic/TransactionStatistic'
import LoyalUserCard from "../../Components/LoyalUserCard/LoyalUserCard";
import TransactionTable from '../../Components/TransactionTable/TransactionTable'
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
const MerchantDashboard = () => {
  const { apiCall } = useApi();
  const [wallet,setWallet] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCall({
          url: "/api/wallet/view/2",
          method: "get",
        });
        setWallet(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  return (
    <>
    <Box sx={{
      display:"flex",
      flexDirection:"column",
      width:'90%',
      margin:'90px auto'
    }}>
      <Box sx={{
        display:"flex",
        justifyContent:"space-between",
        flexWrap:"wrap",
        "@media (max-width:1440px)": {
          justifyContent:"center",
        },
        
      }}>
        <CardBalance title={"USD Balance"} amount={wallet.usdBalance} backGroundColor={"white"} borderColor={"#0F5533"}/>
        <CardBalance title={"USDT Balance"} amount={wallet.usdtBalance} backGroundColor={"white"} borderColor={"#2DD683"}/>
        <CardBalance title={"Income"} amount={'$120.499'} backGroundColor={"white"} borderColor={"#FA8B3A"}/>
        <CardBalance title={"Interacted Users"} amount={'$120.499'} backGroundColor={"white"} borderColor={"#AFAFAF"}/>
      </Box>
      <Box sx={{
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"space-between",
        marginTop:"20px",
        marginBottom:"20px",
        "@media (max-width:1570px)": {
          justifyContent:"center"
        },
      }}>
      <TransactionStatistic/>
      <LoyalUserCard />
      </Box>
      <TransactionTable/>
      </Box>
    </>
  );
};
export default MerchantDashboard;
