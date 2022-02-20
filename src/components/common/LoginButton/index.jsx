import { useState } from "react";
import Button from '@mui/material/Button';
import { detectProvider } from "../../../configs";
import LinearProgress from '@mui/material/LinearProgress';

const LoginButton = (props) => {
  const [isConnecting, setIsConnecting] = useState(false);

  

  const onLoginHandler = async () => {
    
    const provider = detectProvider();
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
    }
    props.onLogin(provider);
  };

  return (
    <div>
      {!isConnecting ? (
        <Button 
        onClick={onLoginHandler}
        variant="contained"
        color="secondary"
        sx={{
          width: '6.3625rem'
        }}
        >
          Connect
        </Button>
        ): (
        <LinearProgress color="secondary" sx={{width: '6.3625rem'}}/>
        ) }
    </div>
  );
};

export default LoginButton;