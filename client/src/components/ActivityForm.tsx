import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../types'

type Props = {
    selected: Activity | null

    onSubmit?(activity: Activity): void
    onCancel?(): void
}

const ActivityForm: FC<Props> = (props: Props): JSX.Element => {
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        if (typeof props.onSubmit === 'function') {
            props.onSubmit(activity)
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setActivity({ ...activity, [e.currentTarget.name]: e.currentTarget.value })
    }

    useEffect((): void => {
        if (props.selected) {
            setActivity({ ...props.selected, date: props.selected.date.split('.')[0] })
        }
    }, [])

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    placeholder="Title"
                    name="title"
                    value={activity?.title ?? ''}
                    onChange={handleInputChange}
                />
                <Form.TextArea
                    placeholder="Description"
                    name="description"
                    rows={2}
                    value={activity?.description ?? ''}
                    onChange={handleInputChange}
                />
                <Form.Input
                    placeholder="Category"
                    name="category"
                    value={activity?.category ?? ''}
                    onChange={handleInputChange}
                />
                <Form.Input
                    placeholder="Date"
                    name="date"
                    type="datetime-local"
                    value={activity?.date ?? ''}
                    onChange={handleInputChange}
                />
                <Form.Input
                    placeholder="City"
                    name="city"
                    value={activity?.city ?? ''}
                    onChange={handleInputChange}
                />
                <Form.Input
                    placeholder="Venue"
                    name="venue"
                    value={activity?.venue ?? ''}
                    onChange={handleInputChange}
                />
                <Button floated="right" positive type="submit">
                    Submit
                </Button>
                <Button floated="right" type="button" onClick={props.onCancel}>
                    Cancel
                </Button>
            </Form>
        </Segment>
    )
}

export default ActivityForm
