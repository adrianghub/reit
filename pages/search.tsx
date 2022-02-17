import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import SearchFilters from '../components/search-filters/SearchFilters';
import Property, {
  IndividualPropertyProp,
} from '../components/property/Property';

import noResults from '../assets/images/noresults.svg';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next/types';
import { fetchApi, baseUrl } from '../utils/fetchApi';

const Search: NextPage = ({
  properties,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();

  return (
    <Box>
      <Flex
        cursor="pointer"
        bg="gray.100"
        borderBottom="1px"
        borderColor="gray.100"
        p="2"
        fontWeight="bold"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
        onClick={() => setSearchFilters((prev) => !prev)}
      >
        <Text>Search By Input Criteria</Text>
        <Icon pl="2" w="7" as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize="2xl" p="4" fontWeight="bold">
        Properties {router.query.purpose}
      </Text>
      <Flex flexWrap="wrap">
        {properties.map((property: IndividualPropertyProp) => (
          <Property key={property.id} property={property} />
        ))}
      </Flex>
      {properties.length === 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mt="5"
          mb="5"
        >
          <Image src={noResults} alt="No results" />
          <Text fontSize="2xl" marginTop="3">
            No results found
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const purpose = query.purpose || 'for-rent';
  const rentFrequency = query.rentFrequency || 'yearly';
  const minPrice = query.minPrice || '0';
  const maxPrice = query.maxPrice || '1000000';
  const roomsMin = query.roomsMin || '0';
  const bathsMin = query.bathsMin || '0';
  const sort = query.sort || 'price-desc';
  const areaMax = query.areaMax || '35000';
  const locationExternalIDs = query.locationExternalIDs || '5002';
  const categoryExternalID = query.categoryExternalID || '4';

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
};

export default Search;
