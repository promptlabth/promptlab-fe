import Modal from 'react-bootstrap/Modal';

export const CreateSellingPageModal = (props: any) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas justo sed tincidunt malesuada.
                    Nullam efficitur, tortor sed suscipit laoreet, magna mi accumsan nunc, eget feugiat turpis velit quis massa.
                    Pellentesque pulvinar malesuada tortor ut pellentesque. Aenean porta nibh id condimentum congue.
                    Fusce laoreet lobortis sapien semper scelerisque. Sed eleifend magna in porttitor consequat.
                    Suspendisse faucibus purus et mi porttitor dictum.
                </p>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas justo sed tincidunt malesuada.
                    Nullam efficitur, tortor sed suscipit laoreet, magna mi accumsan nunc, eget feugiat turpis velit quis massa.
                    Pellentesque pulvinar malesuada tortor ut pellentesque. Aenean porta nibh id condimentum congue.
                    Fusce laoreet lobortis sapien semper scelerisque. Sed eleifend magna in porttitor consequat.
                    Suspendisse faucibus purus et mi porttitor dictum.
                </p>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas justo sed tincidunt malesuada.
                    Nullam efficitur, tortor sed suscipit laoreet, magna mi accumsan nunc, eget feugiat turpis velit quis massa.
                    Pellentesque pulvinar malesuada tortor ut pellentesque. Aenean porta nibh id condimentum congue.
                    Fusce laoreet lobortis sapien semper scelerisque. Sed eleifend magna in porttitor consequat.
                    Suspendisse faucibus purus et mi porttitor dictum.
                </p>

                <p>
                    In tempus laoreet ligula, eu placerat neque venenatis aliquam. Cras ultrices erat et orci semper facilisis.
                    Donec luctus odio dolor, at sodales tortor varius vitae. Interdum et malesuada fames ac ante ipsum primis in faucibus. 
                    In justo diam, lacinia quis nulla non, congue rutrum eros. Nam ut libero id risus mollis sodales. 
                    Nunc id tellus vitae urna vehicula bibendum. Sed consequat purus leo, id posuere diam gravida et. Fusce leo neque, tincidunt ac turpis eu, sagittis hendrerit leo. 
                    Aliquam ut leo porttitor urna fringilla ullamcorper. Donec bibendum convallis lectus, sit amet volutpat metus imperdiet ac. 
                    Proin eu dignissim turpis.
                </p>
            </Modal.Body>
            <Modal.Footer>
                {/* <Button onClick={props.onHide}>Close</Button> */}
            </Modal.Footer>
        </Modal>
    );
}