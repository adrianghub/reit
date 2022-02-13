import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const Layout = ({ children }: { children: ChildNode }) => (
  <>
    <Head>
      <title>Dreams Agency</title>
    </Head>
    <Box maxWidth="1280px" m="auto">
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </Box>
  </>
);

export default Layout;
