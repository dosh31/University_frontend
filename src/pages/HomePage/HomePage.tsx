import {Col, Container, Row} from "reactstrap";
import backgroundImage from "../../assets/background.png";

const HomePage = () => {
	return (
	  <Container>
		<Row>
		  <Col md="12">
			<h1 className="mb-3">Добро пожаловать на сайт заявок на специалистов ГУИМЦ!</h1>
			<p className="fs-5">
			  Приложение создано для автоматизации процесса привлечения специалистов ГУИМЦ к проведению лекций в МГТУ им. Баумана.
			  Система разработана с целью упростить взаимодействие студентов и сотрудников деканата при организации лекций.
			</p>
		  </Col>
		</Row>
		<Row className="justify-content-center">
		  <Col md="6" className="d-flex justify-content-center">
			<img
			  src={backgroundImage}
			  alt="Задний фон"
			  style={{
				width: "60vw", 
				height: "auto", 
				objectFit: "contain",
			  }}
			/>
		  </Col>
		</Row>
	  </Container>
	);
  };

export default HomePage