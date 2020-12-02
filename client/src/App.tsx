import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import 'semantic-ui-css/semantic.css'
import Navbar from './components/Navbar'
import { Activity } from './types'
import './App.css'
import { Button, Container, Grid, Item, Label, Segment } from 'semantic-ui-react'

const App: FC = (): JSX.Element => {
    const [activities, setActivities] = useState<Activity[]>([])

    useEffect(() => {
        axios
            .get<Activity[]>('/api/activities')
            .then((response) => setActivities([...response.data]))
    }, [])

    return (
        <>
            <Navbar />
            <Container style={{ marginTop: '8em' }}>
                <Grid>
                    <Grid.Column width={10}>
                        <Segment clearing>
                            <Item.Group divided>
                                {activities.map((activity) => (
                                    <Item key={activity.id}>
                                        <Item.Content>
                                            <Item.Header as="a">{activity.title}</Item.Header>
                                            <Item.Meta>{activity.date}</Item.Meta>
                                            <Item.Description>
                                                <div>{activity.description}</div>
                                                <div>
                                                    {activity.city}, {activity.venue}
                                                </div>
                                            </Item.Description>
                                            <Item.Extra>
                                                <Button floated="right" color="blue">
                                                    View
                                                </Button>
                                                <Label basic>{activity.category}</Label>
                                            </Item.Extra>
                                        </Item.Content>
                                    </Item>
                                ))}
                            </Item.Group>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Container>
        </>
    )
}

export default App
