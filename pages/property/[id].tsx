import { Avatar, Box, Flex, Spacer, Text } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import { baseUrl, fetchApi } from '../../utils/fetchApi';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
  NextPage,
} from 'next/types';
import ImageScrollbar from '../../components/image-scrollbar/ImageScrollbar';

const PropertyDetails: NextPage = ({
  propertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  },
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <Box maxWidth="1000px" margin="auto" p="4">
    {photos && <ImageScrollbar data={photos} />}
  </Box>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id;
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      propertyDetails: data,
    },
  };
};

export default PropertyDetails;
