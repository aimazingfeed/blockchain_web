import { useState } from "react";
import Button from '@mui/material/Button';
import { DetectProvider } from "../../../configs";

const LoginButton = (props) => {
  const [isConnecting, setIsConnecting] = useState(false);

  

  const onLoginHandler = async () => {
    
    const provider = DetectProvider();
    if (provider) {
      if (provider !== window.ethereum) {
        console.error(
          "Not window.ethereum provider. Do you have multiple wallet installed ?"
        );
      }
      setIsConnecting(true);
      await provider.request({
        method: "eth_requestAccounts",
      });
      setIsConnecting(false);
    }
    props.onLogin(provider);
  };

  return (
    <div>
      <Button 
        onClick={onLoginHandler}
        variant="contained"
        color="secondary"
        sx={{
          width: '6.3625rem'
        }}
      >
        {!isConnecting && "Connect"}
      </Button>
    </div>
  );
};

export default LoginButton;