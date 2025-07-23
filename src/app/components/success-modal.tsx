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
  width: '100%',
  height: '100%',
  backgroundImage: 'url("/Portada4.png")',
  backgroundPosition: 'top',
  backgroundSize: 'cover',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({open, setOpen} : {open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
  const router = useRouter();
  const handleClose = () => {
    setOpen(false)
    router.refresh();
    router.push('/');
    };

  return (
    <div>
        {/* <Button onClick={()=>setOpen(true)}>Abrir</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" sx={{width: '100%', marginX: 'auto', color: 'white', textAlign: 'center', fontWeight: 'bold', position: 'relative', top: '20%', fontSize: 96, }}>
            ¡Gracias por participar!
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Retira tu etiqueta
          </Typography> */}
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{position: 'relative', top: '70%', left: '36.5%', width: 300, height: 50, fontSize: 24}}
          >Volver al Inicio</Button>
        </Box>
      </Modal>
    </div>
  );
}
