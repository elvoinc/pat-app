import { Container, VStack } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import Header from './Header';

type Props = PropsWithChildren<{}>;

const Layout = ({ children }: Props) => {
  return (
    <Container maxW="container.md">
      <VStack spacing={0}>
        <Header />
        {children}
        {/* Footer */}
      </VStack>
    </Container>
  );
};

export default Layout;
