"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SideBar from "./sidebar";
import { StepType } from "../lib/definitions";
import backgrounds from "@/app/data/backgrounds.json";
import stickers from "@/app/data/stickers.json";
import { Dispatch, SetStateAction } from "react";
import StickerCanvas from "../components/stickerCanvas";

const steps: StepType[] = [
  {
    title: "Selecciona un fondo",
    assets: backgrounds,
  },
  {
    title: "Elige los stickers que más te gusten",
    assets: stickers,
  },
  {
    title: "Previsualiza e imprime",
    assets: null,
  },
];

export default function HorizontalLinearStepper({
  backgroundImage,
  setBackgroundImage,
  stickers,
  setStickers,
}: {
  backgroundImage: string | null;
  setBackgroundImage: Dispatch<SetStateAction<string>>;
  stickers: {
    topLeft: string | null;
    topRight: string | null;
    bottomLeft: string | null;
    bottomRight: string | null;
  };
  setStickers: Dispatch<
    SetStateAction<{
      topLeft: string | null;
      topRight: string | null;
      bottomLeft: string | null;
      bottomRight: string | null;
    }>
  >;
}) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box
      sx={{
        height: "auto",
        display: "flex",
        flexDirection: "column",
        padding: 2,
        boxSizing: "border-box",
      }}
    >
      {/* Stepper */}
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          mb: 2,
          "& .MuiStepLabel-label": {
            fontSize: "0.875rem",
          },
          "& .MuiStepIcon-root": {
            fontSize: "1.5rem",
          },
        }}
      >
        {steps.map((step) => (
          <Step key={step.title}>
            <StepLabel>{step.title}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          display: "flex",
          /* justifyContent: "center",
          alignItems: "center", */
        }}
      >
        {activeStep === steps.length ? (
          <Typography variant="h6" align="center">
            ¡Completaste todos los pasos!
          </Typography>
        ) : (
          <div className="flex justify-center md:sticky md:top-4">
            <SideBar
              assets={steps[activeStep].assets}
              onSelectAsset={(url: string) => {
                if (activeStep === 0) {
                  setBackgroundImage?.(url);
                } else if (activeStep === 1) {
                  if (!stickers) return;
                  const updated: {
                    topLeft: string | null;
                    topRight: string | null;
                    bottomLeft: string | null;
                    bottomRight: string | null;
                  } = { ...stickers };

                  const positions = [
                    "topLeft",
                    "topRight",
                    "bottomLeft",
                    "bottomRight",
                  ] as const;
                  for (const pos of positions) {
                    if (!updated[pos]) {
                      updated[pos] = url;
                      break;
                    }
                  }

                  setStickers(updated);
                }
              }}
            />
            <StickerCanvas
              className="relative w-[900px] h-[400px] border border-gray-300 rounded overflow-hidden"
              backgroundImage={backgroundImage}
              stickers={stickers}
            />
          </div>
        )}
      </Box>

      {/* Hero Action Section */}
      <Box
        sx={{
          mt: 2,
          py: 3,
          px: 2,
          backgroundColor: "#f0f4f8",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="subtitle1" gutterBottom>
          {activeStep < steps.length
            ? "Cuando estés listo, haz clic en Siguiente"
            : "¿Quieres volver a empezar?"}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="outlined"
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Atrás
          </Button>
          {activeStep === steps.length ? (
            <Button variant="contained" color="secondary" onClick={handleReset}>
              Reiniciar
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Terminar" : "Siguiente"}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}

/* "use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SideBar from "./sidebar";
import { StepType } from "../lib/definitions";
import backgrounds from '@/app/data/backgrounds.json'
import stickers from '@/app/data/stickers.json'

const steps: StepType[] = [
  {
    title: "Selecciona un fondo",
    assets: backgrounds,
  },
  {
    title: "Elige los stickers que más te gusten",
    assets: stickers,
  },
  {
    title: "Previsualiza e imprime",
    assets: null,
  },
];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Stepper activeStep={activeStep} sx={{marginBottom: "1rem"}} alternativeLabel>
        {steps.map((step) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={step.title} {...stepProps}>
              <StepLabel {...labelProps}>{step.title}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            ¡Completaste todos los pasos!
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <SideBar assets={steps[activeStep].assets} />
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Atrás
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Terminar" : "Siguiente"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
 */
