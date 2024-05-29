import { Box, Container, Flex, Text, VStack, Button, HStack, Input, FormControl, FormLabel, useToast, Select } from "@chakra-ui/react";
import { useState } from "react";
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent, useVenues } from "../integrations/supabase/index.js";

const Index = () => {
  const toast = useToast();
  const { data: events, isLoading: isLoadingEvents, isError: isErrorEvents } = useEvents();
  const { data: venues, isLoading: isLoadingVenues, isError: isErrorVenues } = useVenues();
  const addEventMutation = useAddEvent();
  const updateEventMutation = useUpdateEvent();
  const deleteEventMutation = useDeleteEvent();

  const [newEvent, setNewEvent] = useState({ name: "", date: "", description: "", venue_id: "" });
  const [editingEvent, setEditingEvent] = useState(null);

  const handleAddEvent = () => {
    addEventMutation.mutate(newEvent, {
      onSuccess: () => {
        toast({ title: "Event added.", status: "success", duration: 2000, isClosable: true });
        setNewEvent({ name: "", date: "", description: "", venue_id: "" });
      },
      onError: () => {
        toast({ title: "Error adding event.", status: "error", duration: 2000, isClosable: true });
      }
    });
  };

  const handleUpdateEvent = (event) => {
    updateEventMutation.mutate(event, {
      onSuccess: () => {
        toast({ title: "Event updated.", status: "success", duration: 2000, isClosable: true });
        setEditingEvent(null);
      },
      onError: () => {
        toast({ title: "Error updating event.", status: "error", duration: 2000, isClosable: true });
      }
    });
  };

  const handleDeleteEvent = (id) => {
    deleteEventMutation.mutate(id, {
      onSuccess: () => {
        toast({ title: "Event deleted.", status: "success", duration: 2000, isClosable: true });
      },
      onError: () => {
        toast({ title: "Error deleting event.", status: "error", duration: 2000, isClosable: true });
      }
    });
  };

  return (
    <Box bg="white" minH="100vh">
      <Flex as="nav" bg="gray.100" p={4} justifyContent="center" boxShadow="sm">
        <Text fontSize="xl" fontWeight="bold">My Website</Text>
      </Flex>
      <Container centerContent maxW="container.md" py={10}>
        <VStack spacing={4} w="100%">
          <Text fontSize="2xl">Welcome to My Minimalistic Website</Text>
          <Text>This is a clean and simple landing page.</Text>
          <Box w="100%" p={4} bg="gray.50" borderRadius="md" boxShadow="sm">
            <Text fontSize="xl" mb={4}>Events</Text>
            {isLoadingEvents && <Text>Loading events...</Text>}
            {isErrorEvents && <Text>Error loading events.</Text>}
            {events && events.map(event => (
              <Box key={event.id} p={4} bg="white" borderRadius="md" boxShadow="sm" mb={4}>
                {editingEvent?.id === event.id ? (
                  <VStack spacing={2}>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input value={editingEvent.name} onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Date</FormLabel>
                      <Input type="date" value={editingEvent.date} onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Description</FormLabel>
                      <Input value={editingEvent.description} onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Venue</FormLabel>
                      <Select value={editingEvent.venue_id} onChange={(e) => setEditingEvent({ ...editingEvent, venue_id: e.target.value })}>
                        <option value="">Select Venue</option>
                        {venues && venues.map(venue => (
                          <option key={venue.id} value={venue.id}>{venue.name}</option>
                        ))}
                      </Select>
                    </FormControl>
                    <HStack spacing={2}>
                      <Button colorScheme="blue" onClick={() => handleUpdateEvent(editingEvent)}>Save</Button>
                      <Button onClick={() => setEditingEvent(null)}>Cancel</Button>
                    </HStack>
                  </VStack>
                ) : (
                  <VStack spacing={2} align="start">
                    <Text fontSize="lg" fontWeight="bold">{event.name}</Text>
                    <Text>{event.date}</Text>
                    <Text>{event.description}</Text>
                    <Text>{venues?.find(venue => venue.id === event.venue_id)?.name}</Text>
                    <HStack spacing={2}>
                      <Button size="sm" onClick={() => setEditingEvent(event)}>Edit</Button>
                      <Button size="sm" colorScheme="red" onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
                    </HStack>
                  </VStack>
                )}
              </Box>
            ))}
            <Box mt={4}>
              <Text fontSize="lg" mb={2}>Add New Event</Text>
              <VStack spacing={2}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
                </FormControl>
                <FormControl>
                  <FormLabel>Date</FormLabel>
                  <Input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
                </FormControl>
                <FormControl>
                  <FormLabel>Venue</FormLabel>
                  <Select value={newEvent.venue_id} onChange={(e) => setNewEvent({ ...newEvent, venue_id: e.target.value })}>
                    <option value="">Select Venue</option>
                    {venues && venues.map(venue => (
                      <option key={venue.id} value={venue.id}>{venue.name}</option>
                    ))}
                  </Select>
                </FormControl>
                <Button colorScheme="blue" onClick={handleAddEvent}>Add Event</Button>
              </VStack>
            </Box>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;