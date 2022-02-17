import React, { useEffect, useState } from 'react';
import { Flex, Select, Box, Text, Input, Spinner, Icon, Button } from '@chakra-ui/react';
import router from 'next/router';
import { MdCancel } from 'react-icons/md';
import Image from 'next/image';
import { filterData, getFilterValues } from '../../utils/filterData';
import noResults from '../../assets/images/noresults.svg';
import { baseUrl, fetchApi } from '../../utils/fetchApi';

const SearchFilters = () => {
  const [filters, setFilters] = useState(filterData);
  const [toggleSearchByLocation, setToggleSearchByLocation] = useState(false);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      if (location) {
        const  fetchLocationData = async () => {
          setLoading(true);
          try {
            const data = await fetchApi(`${baseUrl}/auto-complete?query=${location}`);
            setLoading(false);
            setLocationData(data?.hits); 
          } catch (error) {
            console.log(error);
          }
        }
        fetchLocationData();
      }
  
      if (location === '') {
        setLoading(false);
        setLocationData([]);
      }
    }, 1000)
  }, [location]);

  const searchProperties = (filterValues: any) => {
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filterValues);

    values.forEach(item => {
      query[item.name] = item.value;
    })

    router.push({ pathname: path, query });
  }

  return (
    <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
      {filters.map(filter => (
        <Box key={filter.queryName}>
          <Select 
            onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })}
            placeholder={filter.placeholder}
          >
            {filter?.items?.map(item => (
              <option value={item.value} key={item.value}>{item.name}</option>
            ))}
          </Select>
        </Box>
      ))}
      <Flex flexDir="column">
      <Button
        border='1px'
        borderColor='gray.200'
        onClick={() => setToggleSearchByLocation(prev => !prev)}
      >Search by Location</Button>
      {toggleSearchByLocation && (
        <Flex flexDir='column' pos='relative' paddingTop='2'>
        <Input
          value={location}
          w='300px'
          focusBorderColor='gray.300'
          disabled={loading}
          onChange={(e) => setLocation(e.target.value)}
        />
        {location !== '' && !loading && (
          <Icon 
            as={MdCancel}
            pos='absolute'
            cursor="pointer"
            right='5'
            top='5'
            zIndex='100'
            onClick={() => {
              setLocation('');
              setLocationData([]);
            }}
          />
        )}
        {loading && <Spinner margin='auto' marginTop='3' />}
        {toggleSearchByLocation && (
          <Box>
            {locationData?.map((location: { id: number; externalID: string, name: string }) => (
              <Box
                key={location.id}
                onClick={() => {
                  searchProperties({ locationExternalIDs: location.externalID });
                  setToggleSearchByLocation(false);
                  setLocation(location.name);
                }}
                >
                  <Text cursor='pointer' bg='gray.200' p='2' borderBottom='1px' borderColor='gray.100'>{location.name}</Text>
                  </Box>
            ))}
            {!loading && !locationData?.length && (
              <Flex>
                <Image src={noResults} alt="No results." />
                <Text fontSize='xl' mt='3'>Start searching...</Text>
              </Flex>
            )}
          </Box>
        )}
        </Flex>
      )}
      </Flex>
    </Flex>
  )
}

export default SearchFilters;