import {Col, Container, Row} from "reactstrap";
//import * as React from "react";

const HomePage = () => {
	return (
		<Container>
			<Row>
				<Col md="12">
					<h1 className="mb-3">Добро пожаловать на сайт заявок на специалистов ГУИМЦ!</h1>
					<p className="fs-5">Наше приложение создано для автоматизации процесса привлечения специалистов ГУИМЦ к проведению лекций в МГТУ им. Баумана. Система разработана с целью упростить взаимодействие студентов и сотрудников деканата при организации лекций.</p>
				</Col>
			</Row>
		</Container>
	)
}

export default HomePage