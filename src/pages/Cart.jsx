import { useState } from "react";
import { Button, Container, Form, ListGroup, Modal, Image } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { Trash, DashLg, PlusLg } from "react-bootstrap-icons";
import useCart from "../context/UseCart";

const PLACEHOLDER = 'https://placehold.co/80x80?text=Cat';

function validate(form) {
    const errors = {}
    if (!form.name.trim()) errors.name = 'Name is required';
    if (!form.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Not valid email';
    if (!form.address.trim()) errors.address = 'Adress is required';
    return errors;
}

export default function Cart() {
    const {cartItems, removeFromCart, increaseQuantity, decreaseQuantity, setCartItems, totalItems} = useCart();
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', address: '' });
    const [errors, setErrors] = useState({});

    const handleChange = e => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]: value}));
        if (errors[name]) setErrors(prev => ({...prev, [name]: undefined}));
    };

    const handleSubmit = e => {
        e.preventDefault();
        const errs = validate(form);
        if(Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        const {name, address} = form;
        setCartItems([]);
        setShowModal(false);
        setForm({name: '', email: '', address: ''});
        alert(`Order placed! Thank you ${name}, we will deliver to: ${address}`);
    };

    return (
        <Container className="py-5">
            <h1 className="fw-bold mb-4">Shopping Cart</h1>

            {cartItems?.length === 0 ? (
                <p className="text-muted">
                    Din kundvagn är tom. {' '}
                    <Link to="/cats">Bläddra bland katter</Link>
                </p>
            ) : (
                <>
                    <ListGroup variant="flush" className="border rounded mb-4">
                        {cartItems.map(item => {
                            const imageUrl = item.reference_image_id
                                ? `https://cdn2.thecatapi.com/images/${item.reference_image_id}.jpg`
                                : PLACEHOLDER;
                            return (
                                <ListGroup.Item
                                    key={item.id}
                                    className="d-flex align-items-center gap-3 py-3"
                                >
                                    <Image
                                        src={imageUrl}
                                        alt={item.name}
                                        rounded
                                        style={{width: 80, height: 80, objectFit: 'cover'}}
                                        onError={e => {e.target.src = PLACEHOLDER;}}
                                    />
                                    <div className="flex-grow-1">
                                        <div className="fw-bold">{item.name}</div>
                                        <small className="text-muted">{item.origin}</small>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => decreaseQuantity(item.id)}
                                        >
                                            <DashLg />
                                        </Button>
                                        <span className="fw-bold" style={{minWidth: 24, textAlign: 'center'}}>
                                            {item.quantity}
                                        </span>
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => increaseQuantity(item.id)}
                                        >
                                            <PlusLg />
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <Trash />
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>

                    <div className="text-end">
                        <p className="text-muted mb-3">
                            {totalItems} {totalItems === 1 ? 'cat' : 'cats'} in cart
                        </p>
                        <Button className="btn-catstore" size="lg" onClick={() => setShowModal(true)}>
                            Complete Purchase
                        </Button>
                    </div>
                </>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Place Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} noValidate>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name}
                                placeholder="Your full name"
                            />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                                placeholder="your@email.com"
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Delivery Address</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                isInvalid={!!errors.address}
                                placeholder="Street address, city, postal code"
                            />
                            <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                        </Form.Group>

                        <div className="d-flex gap-2 justify-content-end">
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" className="btn-catstore">
                                Place order
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}