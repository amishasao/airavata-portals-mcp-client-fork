import {Heading, VStack} from "@chakra-ui/react";
import {KeyPair} from "../typography/KeyPair";

export const Aug6MDWorkshop = () => {
  return (
      <>
        <Heading fontSize="3xl" lineHeight={1.2}>
          63rd Hands-on Workshop on Computational Biophysics (04-08 August 2025)
        </Heading>
        <VStack gap={1} align="start" mt={2}>
          <KeyPair
              keyStr="Workshop Details"
              valueStr="https://www.ks.uiuc.edu/Training/Workshop/Auburn2025"
              href="https://www.ks.uiuc.edu/Training/Workshop/Auburn2025"
          />
          <KeyPair
              keyStr="User Instructions"
              valueStr="Cybershuttle Instrutions for MD Workshop"
              href="https://drive.google.com/file/d/1vRICIA6JGZT4CdzFNaIL_mCBwc3I5JFK/view"
          />
        </VStack>
      </>
  );
};
