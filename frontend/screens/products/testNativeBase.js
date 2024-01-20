import { Button, Container, Heading, Icon, VStack } from 'native-base';
import React, { Component } from 'react';
import { MaterialIcons } from "react-native-vector-icons";
export default class ListExample extends Component {
    render() {
        return (
            <Container>
                <Heading>
                    Inside Heading of the container
                </Heading>
                <Button>Click Me</Button>
                <VStack space={4} alignItems="center">
                    <Icon as={MaterialIcons} name="search" />
                </VStack>



            </Container>
        );
    }
}
{/* <Header />
<Content>
    <List>
        <ListItem>
            <Text>Simon Mignolet</Text>
        </ListItem>
        <ListItem>
            <Text>Nathaniel Clyne</Text>
        </ListItem>
        <ListItem>
            <Text>Dejan Lovren</Text>
        </ListItem>
    </List>
</Content> */}