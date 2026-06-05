import { useEffect, useState } from "react";
import { fetchBreeds } from "../services/api";
import { Container, Row, Col, Form, Spinner, Pagination } from 'react-bootstrap';
import { Search } from "react-bootstrap-icons";
import CatCard from "../components/CatCard";

const page_size = 10;

export default function Cats() {
  const [allCats, setAllCats] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBreeds(30)
        .then(data => {
            setAllCats(data);
            setFiltered(data);
            setLoading(false);
        })
        .catch(() => {
            setError('Failed to load cats. Please try again later.')
            setLoading(false)
        });
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(allCats.filter(c => c.name.toLowerCase().includes(q)));
    setPage(1);
  }, [search, allCats]);

  const totalPages = Math.ceil(filtered.length / page_size);
  const pageCats = filtered.slice((page - 1) * page_size, page * page_size);

  return (
    <>
        <div className="bg-dark text-white text-center py-4">
            <h1 className="fw-bold mb-1">Our Cats</h1>
            <p className="text-secondary mb-0">Find your ideal companion below</p>
        </div>

        <Container className="py-4">
            <div className="input-group mb-4" style={{maxWidth: 400}}>
                <span className="input-group-text bg-white">
                    <Search />
                </span>
                <Form.Control
                    type="search"
                    placeholder="Search breeds..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            {loading && (
                <div className="text-center py-5">
                    <Spinner animation="border" style={{color:'#ff6600'}} />
                </div>
            )}

            {error && <p className="text-danger">{error}</p>}

            {!loading && !error && (
                <>
                    <Row xs={1} sm={2} md={3} lg={4} className="g-4 mb-4">
                        {pageCats.map(cat => (
                            <Col key={cat.id}>
                                <CatCard cat={cat} />
                            </Col>
                        ))}
                        {pageCats.length === 0 && (
                            <Col xs={12}>
                                <p className="text-muted">No breeds match your search</p>
                            </Col>
                        )}
                    </Row>

                    {totalPages > 1 && (
                        <Pagination className="justify-content-center">
                            <Pagination.Prev
                                disabled={page === 1}
                                onClick={() => setPage(p => p - 1)}
                            />
                            {Array.from({length: totalPages}, (_, i) => (
                                <Pagination.Item
                                    key={i+1}
                                    active={page === i+1}
                                    onClick={() => setPage(i+1)}
                                >
                                    {i+1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next
                                disabled={page === totalPages}
                                onClick={() => setPage(p => p+1)}
                            />
                        </Pagination>
                    )}
                </>
            )}
        </Container>
    </>
  )
}