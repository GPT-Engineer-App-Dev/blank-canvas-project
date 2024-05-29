import { Box, Container, Flex, Text, VStack, Button, HStack, Input, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useVenues, useAddVenue, useUpdateVenue, useDeleteVenue } from "../integrations/supabase/index.js";

const Venues = () => {
  const toast = useToast();
  const { data: venues, isLoading, isError } = useVenues();
  const addVenueMutation = useAddVenue();
  const updateVenueMutation = useUpdateVenue();
  const deleteVenueMutation = useDeleteVenue();

  const [newVenue, setNewVenue] = useState({ name: "", location: "", description: "" });
  const [editingVenue, setEditingVenue] = useState(null);

  const handleAddVenue = () => {
    addVenueMutation.mutate(newVenue, {
      onSuccess: () => {
        toast({ title: "Venue added.", status: "success", duration: 2000, isClosable: true });
        setNewVenue({ name: "", location: "", description: "" });
      },
      onError: () => {
        toast({ title: "Error adding venue.", status: "error", duration: 2000, isClosable: true });
      }
    });
  };

  const handleUpdateVenue = (venue) => {
    updateVenueMutation.mutate(venue, {
      onSuccess: () => {
        toast({ title: "Venue updated.", status: "success", duration: 2000, isClosable: true });
        setEditingVenue(null);
      },
      onError: () => {
        toast({ title: "Error updating venue.", status: "error", duration: 2000, isClosable: true });
      }
    });
  };

  const handleDeleteVenue = (id) => {
    deleteVenueMutation.mutate(id, {
      onSuccess: () => {
        toast({ title: "Venue deleted.", status: "success", duration: 2000, isClosable: true });
      },
      onError: () => {
        toast({ title: "Error deleting venue.", status: "error", duration: 2000, isClosable: true });
      }
    });
  };

  return (
    <Box bg="white" minH="100vh">
      <Flex as="nav" bg="gray.100" p={4} justifyContent="center" boxShadow="sm">
        <Text fontSize="xl" fontWeight="bold">Venues</Text>
      </Flex>
      <Container centerContent maxW="container.md" py={10}>
        <VStack spacing={4} w="100%">
          <Text fontSize="2xl">Manage Venues</Text>
          <Box w="100%" p={4} bg="gray.50" borderRadius="md" boxShadow="sm">
            <Text fontSize="xl" mb={4}>Venues</Text>
            {isLoading && <Text>Loading venues...</Text>}
            {isError && <Text>Error loading venues.</Text>}
            {venues && venues.map(venue => (
              <Box key={venue.id} p={4} bg="white" borderRadius="md" boxShadow="sm" mb={4}>
                {editingVenue?.id === venue.id ? (
                  <VStack spacing={2}>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input value={editingVenue.name} onChange={(e) => setEditingVenue({ ...editingVenue, name: e.target.value })} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Location</FormLabel>
                      <Input value={editingVenue.location} onChange={(e) => setEditingVenue({ ...editingVenue, location: e.target.value })} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Description</FormLabel>
                      <Input value={editingVenue.description} onChange={(e) => setEditingVenue({ ...editingVenue, description: e.target.value })} />
                    </FormControl>
                    <HStack spacing={2}>
                      <Button colorScheme="blue" onClick={() => handleUpdateVenue(editingVenue)}>Save</Button>
                      <Button onClick={() => setEditingVenue(null)}>Cancel</Button>
                    </HStack>
                  </VStack>
                ) : (
                  <VStack spacing={2} align="start">
                    <Text fontSize="lg" fontWeight="bold">{venue.name}</Text>
                    <Text>{venue.location}</Text>
                    <Text>{venue.description}</Text>
                    <HStack spacing={2}>
                      <Button size="sm" onClick={() => setEditingVenue(venue)}>Edit</Button>
                      <Button size="sm" colorScheme="red" onClick={() => handleDeleteVenue(venue.id)}>Delete</Button>
                    </HStack>
                  </VStack>
                )}
              </Box>
            ))}
            <Box mt={4}>
              <Text fontSize="lg" mb={2}>Add New Venue</Text>
              <VStack spacing={2}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input value={newVenue.name} onChange={(e) => setNewVenue({ ...newVenue, name: e.target.value })} />
                </FormControl>
                <FormControl>
                  <FormLabel>Location</FormLabel>
                  <Input value={newVenue.location} onChange={(e) => setNewVenue({ ...newVenue, location: e.target.value })} />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input value={newVenue.description} onChange={(e) => setNewVenue({ ...newVenue, description: e.target.value })} />
                </FormControl>
                <Button colorScheme="blue" onClick={handleAddVenue}>Add Venue</Button>
              </VStack>
            </Box>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Venues;