import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import 'semantic-ui-css/semantic.css'
import Navbar from './components/Navbar'
import { Activity } from './types'
import './App.css'
import { Button, Container, Grid, Item, Label, Segment } from 'semantic-ui-react'
import ActivityForm from './components/ActivityForm'
import ActivityDetails from './components/ActivityDetails'

const App: FC = (): JSX.Element => {
    const [activities, setActivities] = useState<Activity[]>([])
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)

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
                                                <Button
                                                    floated="right"
                                                    color="blue"
                                                    onClick={() => setSelectedActivity(activity)}>
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
                    <Grid.Column width={6}>
                        {selectedActivity && <ActivityDetails selected={selectedActivity} />}
                        <ActivityForm />
                    </Grid.Column>
                </Grid>
            </Container>
        </>
    )
}

export default App
