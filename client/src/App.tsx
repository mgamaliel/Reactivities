import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import 'semantic-ui-css/semantic.css'
import { v4 as uuid } from 'uuid'
import Navbar from './components/Navbar'
import { Activity } from './types'
import './App.css'
import { Button, Container, Grid, Item, Label, Segment } from 'semantic-ui-react'
import ActivityForm from './components/ActivityForm'
import ActivityDetails from './components/ActivityDetails'

const App: FC = (): JSX.Element => {
    const [activities, setActivities] = useState<Activity[]>([])
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
    const [editMode, setEditMode] = useState<boolean>(false)

    useEffect(() => {
        axios
            .get<Activity[]>('/api/activities')
            .then((response) => setActivities([...response.data]))
    }, [])

    return (
        <>
            <Navbar
                onCreate={() => {
                    setSelectedActivity(null)
                    setEditMode(true)
                }}
            />
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
                                                    onClick={() => {
                                                        setSelectedActivity(activity)
                                                        setEditMode(false)
                                                    }}>
                                                    View
                                                </Button>
                                                <Button
                                                    floated="right"
                                                    color="red"
                                                    onClick={() => {
                                                        setActivities([
                                                            ...activities.filter(
                                                                (a) => a.id !== activity.id
                                                            )
                                                        ])
                                                    }}>
                                                    Delete
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
                        {selectedActivity && !editMode && (
                            <ActivityDetails
                                selected={selectedActivity}
                                onCancel={() => setSelectedActivity(null)}
                                onEdit={() => setEditMode(true)}
                            />
                        )}
                        {editMode && (
                            <ActivityForm
                                key={selectedActivity?.id ?? 0}
                                selected={selectedActivity}
                                onCancel={() => setEditMode(false)}
                                onSubmit={(activity) => {
                                    if (selectedActivity) {
                                        setActivities([
                                            ...activities.filter((a) => a.id !== activity.id),
                                            activity
                                        ])
                                    } else {
                                        setActivities([...activities, { ...activity, id: uuid() }])
                                    }

                                    setSelectedActivity(activity)
                                    setEditMode(false)
                                }}
                            />
                        )}
                    </Grid.Column>
                </Grid>
            </Container>
        </>
    )
}

export default App
