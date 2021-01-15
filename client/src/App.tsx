import React, { FC, useEffect, useState } from 'react'
import 'semantic-ui-css/semantic.css'
import { v4 as uuid } from 'uuid'
import Navbar from './components/Navbar'
import { Activity } from './types'
import './App.css'
import { Button, Container, Grid, Item, Label, Segment } from 'semantic-ui-react'
import ActivityForm from './components/ActivityForm'
import ActivityDetails from './components/ActivityDetails'
import agent from './api/agent'
import Loading from './components/Loading'

const App: FC = (): JSX.Element => {
    const [activities, setActivities] = useState<Activity[]>([])
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [target, setTarget] = useState<string>('')

    useEffect(() => {
        agent.activities
            .list()
            .then((data) => setActivities(data))
            .then(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return <Loading content="Loading activities" />
    }

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
                                                    name={activity.id}
                                                    floated="right"
                                                    color="red"
                                                    loading={target === activity.id && isSubmitting}
                                                    onClick={async () => {
                                                        setIsSubmitting(true)
                                                        setTarget(activity.id)
                                                        await agent.activities.delete(activity.id)
                                                        setActivities([
                                                            ...activities.filter(
                                                                (a) => a.id !== activity.id
                                                            )
                                                        ])
                                                        setIsSubmitting(false)
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
                                isSubmitting={isSubmitting}
                                onCancel={() => setEditMode(false)}
                                onSubmit={async (activity) => {
                                    setIsSubmitting(true)
                                    if (selectedActivity) {
                                        await agent.activities.update(activity)
                                        setActivities([
                                            ...activities.filter((a) => a.id !== activity.id),
                                            activity
                                        ])
                                    } else {
                                        await agent.activities.create({ ...activity, id: uuid() })
                                        setActivities([...activities, { ...activity, id: uuid() }])
                                    }

                                    setSelectedActivity(activity)
                                    setEditMode(false)
                                    setIsSubmitting(false)
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
