import { Container, Row } from 'reactstrap';

function Footer() {
  return (
    <section className="footer bg-purple-950 py-3 mt-4">
      <Container>
        <Row className="block text-center text-xs mx-auto text-white">
          Built by ghosty@blacksla.sh
        </Row>
      </Container>
    </section>
  )
}

export default Footer;