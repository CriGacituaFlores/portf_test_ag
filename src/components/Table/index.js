import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const TableView = ({ header, body }) => (
  <Table
    selectable={false}
    multiSelectable={false}
  >
    <TableHeader
      displaySelectAll={false}
      adjustForCheckbox={false}
      enableSelectAll={false}
    >
      <TableRow>
        {header.map(colum => (<TableHeaderColumn>{colum}</TableHeaderColumn>))}
      </TableRow>
    </TableHeader>
    <TableBody
      displayRowCheckbox={false}
      deselectOnClickaway={false}
      showRowHover={false}
      stripedRows={false}
    >
      {body.map(row => (
        <TableRow>
          {row.map(colum => (<TableRowColumn>{colum}</TableRowColumn>))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

TableView.propTypes = {
  header: PropTypes.arrayOf(PropTypes.any),
  body: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
};

TableView.defaultProps = {
  header: [],
  body: [[]]
  // login: {
  //   isLoading: false,
  //   hasSucceeded: false,
  //   error: null,
  // }
};

export default TableView;
