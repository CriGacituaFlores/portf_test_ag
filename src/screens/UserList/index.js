import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper } from 'material-ui';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import ReactTable from 'react-table';

// import Delete from 'material-ui/svg-icons/action/delete';
import Edit from 'material-ui/svg-icons/editor/mode-edit';

import 'react-table/react-table.css';

import getUserList from '../../actions/team';
import { clearUser } from '../../actions/user';

const getColumns = (role) => {
  const columns = [{
    Header: 'Nombre',
    accessor: 'profile.firstName',
    style: { paddingLeft: 20 },
    Cell: props => `${props.value} ${props.original.profile.lastName}`,
    filterMethod: (filter, row) => row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
  }, {
    Header: 'Email',
    accessor: 'username',
  }, {
    Header: 'Rol',
    accessor: 'role',
    maxWidth: 180,
    style: { textAlign: 'right', paddingRight: 20 },
  }];

  if (role === 'admin') {
    columns.push({
      Header: 'Empresa',
      accessor: 'companyId.name',
      maxWidth: 200,
    });
    columns.push(
      {
        Header: 'Editar',
        accessor: 'edit',
        maxWidth: 80,
        sortable: false,
        filterable: false,
        style: { textAlign: 'center', cursor: 'pointer' },
        Cell: () => <Edit />
      });
  }

  return columns;
};


/**
 * List all members of the team
 */
class UserList extends Component {
  componentWillMount() {
    this.props.clearUser();
    this.props.getUserList();
  }

  render() {
    return (
      <div>
        <h3 className="row-title">Usuarios</h3>
        <p className="row-subtitle">Aquí encontrarás todos los usuarios.</p>
        <Row style={{ marginTop: 24, height: '100%' }}>
          <Col xs={12} sm={12} md={12} lg={12} className="box-number">
            <Paper>
              {this.props.team && this.props.team.data && this.props.me &&
                <ReactTable
                  className="-striped -highlight"
                  previousText="Anterior"
                  nextText="Siguiente"
                  loadingText="Loading..."
                  noDataText="No se encontró ningún partipante"
                  pageText="Página"
                  ofText="de"
                  rowsText="filas"
                  data={this.props.team.data}
                  columns={getColumns(this.props.me.role)}
                  filterable
                  defaultSorted={[
                    {
                      id: 'profile.firstName',
                      desc: false
                    }
                  ]}
                  getTdProps={(state, rowInfo, column, instance) => ({
                    onClick: (e, handleOriginal) => {
                      if (column.id === 'edit') {
                        console.log('Editar fila:', rowInfo.row._original._id);
                        this.props.history.push(`/profile/${rowInfo.row._original._id}/edit/`);
                      }

                      if (column.id === 'delete') {
                        console.log('Borrar fila:', rowInfo.row._original._id);
                      }

                      // IMPORTANT! React-Table uses onClick internally to trigger
                      // events like expanding SubComponents and pivots.
                      // By default a custom 'onClick' handler will override this functionality.
                      // If you want to fire the original onClick handler, call the
                      // 'handleOriginal' function.
                      if (handleOriginal) {
                        handleOriginal();
                      }
                    }
                  })}
                />
              }
            </Paper>
          </Col>
        </Row>
      </div>
    );
  }
}

UserList.propTypes = {
  team: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
  me: PropTypes.shape({
    role: PropTypes.string
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  getUserList: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
};

UserList.defaultProps = {
  me: null
};

const mapStateToProps = state => ({ // eslint-disable-line
  team: state.team,
  me: state.me.data
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
  getUserList: () => dispatch(getUserList()),
  clearUser: () => dispatch(clearUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
