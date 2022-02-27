import React from 'react';
import {
  Heading,
  HStack,
  IconButton,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { BsMoonStarsFill, BsMoonStars } from 'react-icons/bs';

type Props = {};

const Header = (props: Props) => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <HStack w="full" justify="space-between" align="center">
      <Heading>Pat.</Heading>
      <HStack align="center" spacing={3}>
        <Text>Daesik</Text>
        <Text>Daesik</Text>
        <IconButton
          aria-label="toggle theme"
          icon={colorMode === 'light' ? <BsMoonStarsFill /> : <BsMoonStars />}
          variant="ghost"
          onClick={toggleColorMode}
        />
      </HStack>
    </HStack>
  );
};

export default Header;
