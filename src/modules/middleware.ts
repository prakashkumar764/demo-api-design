import { validationResult } from 'express-validator'

export const handleInputErrors = (req, res) => {
    const errors = validationResult(req)
    console.log('Validation result:', errors)
    if (!errors.isEmpty()) {
        res.status(400);
        res.json({ errors: errors.array() })
    }
    console.log('Validation passed:')

}