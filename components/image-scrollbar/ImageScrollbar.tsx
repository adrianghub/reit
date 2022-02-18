/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useContext } from 'react';
import Image from 'next/image';
import { Box, Icon, Flex } from '@chakra-ui/react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Flex justifyContent="center" alignItems="center" marginRight="1">
      <Icon
        as={FaArrowAltCircleLeft}
        onClick={() => scrollPrev()}
        fontSize="2xl"
        cursor="pointer"
      />
    </Flex>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Flex justifyContent="center" alignItems="center" marginRight="1">
      <Icon
        as={FaArrowAltCircleRight}
        onClick={() => scrollNext()}
        fontSize="2xl"
        cursor="pointer"
      />
    </Flex>
  );
};

const ImageScrollbar = ({ data }: { data: { id: string; url: string }[] }) => (
  <ScrollMenu
    LeftArrow={LeftArrow}
    RightArrow={RightArrow}
    // @ts-ignore
    style={{ overflow: 'hidden' }}
  >
    {data.map((image) => (
      <Box
        width="910px"
        key={image.id}
        // @ts-ignore
        itemId={image.id}
        overflow="hidden"
        padding="1"
      >
        <Image
          placeholder="blur"
          blurDataURL={image.url}
          src={image.url}
          width={1000}
          height={500}
          alt="Property"
          sizes="(max-width:500px) 100px, (max-width:1023px) 400px, 1000px"
        />
      </Box>
    ))}
  </ScrollMenu>
);

export default ImageScrollbar;
