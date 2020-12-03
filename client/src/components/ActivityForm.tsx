import React, { FC } from 'react'
import { Form, Segment } from 'semantic-ui-react'

const ActivityForm: FC = (): JSX.Element => {
    return (
        <Segment>
            <Form>
                <Form.Input placeholder="Title" />
                <Form.TextArea placeholder="Description" rows={2} />
                <Form.Input placeholder="Category" />
                <Form.Input placeholder="Date" type="date" />
                <Form.Input placeholder="City" />
                <Form.Input placeholder="Venue" />
            </Form>
        </Segment>
    )
}

export default ActivityForm
