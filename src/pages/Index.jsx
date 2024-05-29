import { Box, Container, Flex, Text, VStack } from "@chakra-ui/react";

const Index = () => {
  return (
    <Box bg="white" minH="100vh">
      <Flex as="nav" bg="gray.100" p={4} justifyContent="center" boxShadow="sm">
        <Text fontSize="xl" fontWeight="bold">My Website</Text>
      </Flex>
      <Container centerContent maxW="container.md" py={10}>
        <VStack spacing={4}>
          <Text fontSize="2xl">Welcome to My Minimalistic Website</Text>
          <Text>This is a clean and simple landing page.</Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;