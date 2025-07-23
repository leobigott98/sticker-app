import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useRouter } from "next/navigation";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  justifyContent: 'center',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 500,
  backgroundImage: 'url("/Portada.png")',
  backgroundPosition: 'top',
  backgroundSize: 'cover',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({open, setOpen} : {open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
  const handleClose = () => setOpen(false);
  const router = useRouter();

  return (
    <div>
        <Button onClick={()=>setOpen(true)}>Abrir</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" sx={{width: '80%', marginX: 'auto', color: 'white', textAlign: 'center', fontWeight: 'bold', paddingTop: 2}}>
            ¡Gracias por participar!
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Retira tu etiqueta
          </Typography> */}
          <Button
            variant="contained"
            onClick={()=>{
                router.refresh();
                router.push('/');
            }}
            sx={{position: 'absolute', bottom: 30, left: 150}}
          >Aceptar</Button>
        </Box>
      </Modal>
    </div>
  );
}
