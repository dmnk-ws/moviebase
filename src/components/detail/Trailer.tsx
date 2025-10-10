import React, { useState } from 'react';
import {
  Skeleton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Stack,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import { Video } from '../../entities/Video';

interface TrailerProps {
  loading: boolean;
  trailer?: Video;
}

const Trailer = ({ loading, trailer }: TrailerProps) => {
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  return loading ? (
    <Skeleton variant="rounded" width={100} height={50} />
  ) : (
    trailer && (
      <>
        <Button
          onClick={handleModalOpen}
          startIcon={<PlayArrowIcon />}
          variant="outlined"
          sx={{
            color: 'white',
            borderRadius: '20px',
            borderColor: 'rgba(255, 159, 128, 0.5)',
            textTransform: 'none',
            '&:hover': {
              borderColor: 'rgba(255, 159, 128, 1)',
              backgroundColor: 'rgba(255, 159, 128, 0.1)',
            },
            '&:disabled': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: 'rgba(255, 255, 255, 0.5)',
            },
          }}
        >
          Watch Trailer
        </Button>
        <Dialog
          open={open}
          onClose={handleModalClose}
          maxWidth="lg"
          fullWidth
          slotProps={{
            paper: {
              sx: {
                backgroundColor: 'black',
                margin: { xs: 2, sm: 4 },
              },
            },
          }}
        >
          <Stack
            direction="row"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            paddingRight={2}
          >
            <DialogTitle color="white">{trailer.name || 'Play trailer'}</DialogTitle>
            <IconButton
              onClick={handleModalClose}
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50%',
                width: 40,
                height: 40,
                '&:hover': {
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          <DialogContent
            sx={{
              padding: 0,
              backgroundColor: 'black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name || 'Trailer'}
              style={{
                border: 0,
                display: 'block',
                aspectRatio: '16/9',
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </DialogContent>
        </Dialog>
      </>
    )
  );
};

export default Trailer;
