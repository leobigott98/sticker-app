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
import {
  StickerCanvas,
  StickerCanvasHandle,
} from "../components/stickerCanvas";
import Export from "./export";
import { useRef } from "react";
import Link from "next/link";

const steps: StepType[] = [
  {
    title: "Selecciona un fondo",
    assets: backgrounds,
  },
  {
    title: "Elige tus stickers",
    assets: stickers,
  },
  {
    title: "Imprime",
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
  const canvasRef = useRef<StickerCanvasHandle>(null);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setBackgroundImage("");
    setStickers({
      topLeft: null,
      topRight: null,
      bottomLeft: null,
      bottomRight: null,
    });
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
            fontSize: "2rem",
          },
          "& .MuiStepIcon-root": {
            fontSize: "3.5rem",
            /*  color: "#cf0087" */
          },
          "& .MuiStepIcon-root.Mui-active": {
            color: "#cf0087",
          },
          "& .MuiStepIcon-root.Mui-completed": {
            color: "#cf0087",
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
          height: "75.4rem",
          /* justifyContent: "center",
          alignItems: "center", */
        }}
      >
        {activeStep === steps.length ? (
          <div className="space-y-5">
            <Export />
            <StickerCanvas
              className="relative w-[1000px] h-[400px] border border-gray-300 rounded overflow-hidden"
              backgroundImage={backgroundImage}
              stickers={stickers}
              setStickers={setStickers}
              ref={canvasRef}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center md:sticky md:top-4">
            {activeStep === 1 && (
              <div className="absolute top-105 right-4 z-50">
                <button
                  onClick={() =>
                    setStickers?.({
                      topLeft: null,
                      topRight: null,
                      bottomLeft: null,
                      bottomRight: null,
                    })
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Resetear Stickers
                </button>
              </div>
            )}
            {activeStep === steps.length - 1 ? (
              <StickerCanvas
                className="relative w-[1000px] h-[400px] border border-gray-300 rounded overflow-hidden"
                backgroundImage={backgroundImage}
                stickers={stickers}
                setStickers={setStickers}
                ref={canvasRef}
              />
            ) : (
              <>
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
                  setStickers={setStickers}
                  ref={canvasRef}
                />
              </>
            )}
          </div>
        )}
      </Box>

      {/* Hero Action Section */}
      <Box
        sx={{
          mt: 2,
          py: 3,
          px: 2,
          backgroundColor: "#009d7f",
          borderRadius: 2,
          textAlign: "center",
          alignContent: "center",
          height: "15rem",
        }}
      >
        {/* <Typography variant="subtitle1" gutterBottom sx={{fontSize: 32}}>
          {activeStep < steps.length
            ? "Cuando estés listo, haz clic en Siguiente"
            : "¿Quieres volver a empezar?"}
        </Typography> */}
        
        <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
          <Button
            variant="outlined"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ fontSize: 32, color: "white" }}
          >
            Atrás
          </Button>
          {activeStep === steps.length ? (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ fontSize: 32, visibility: "hidden" }}
            >
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ fontSize: 32 }}
            >
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
