import {} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box, Flex, Text, Avatar } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';

interface PropertyProps {
  property: IndividualPropertyProp;
}

export interface IndividualPropertyProp {
  coverPhoto: string;
  price: number;
  rentFrequency: string;
  rooms: number;
  title: string;
  baths: number;
  area: number;
  agency: any;
  isVerified: boolean;
  id: number;
  externalID: string;
}

const Property = ({
  property: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
  },
}: PropertyProps) => <Link href={`/property/${externalID}`} passHref></Link>;

export default Property;
