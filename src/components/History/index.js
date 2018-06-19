import React from 'react';
import {
  List,
  ListItem,
  Subheader,
  Divider,
  Paper,
  IconButton,
  CircularProgress
} from 'material-ui';
import moment from 'moment';
import spanish from 'moment/locale/es';
import { green600, red600, orange600 } from 'material-ui/styles/colors';

import Empty from 'material-ui/svg-icons/action/rowing';
import Check from 'material-ui/svg-icons/action/check-circle';
import Add from 'material-ui/svg-icons/content/add-circle';
import Reject from 'material-ui/svg-icons/navigation/cancel';
import Wait from 'material-ui/svg-icons/action/hourglass-empty';

moment.locale('es', spanish);

const History = ({
  data,
  isLoading,
  title,
  type,
  notas,
  history
}) => (
    <Paper style={{ overflow: 'hidden', height: 320, overflowY: 'auto' }} zDepth={1}>
      {data && data.length > 0 && !isLoading &&
        <List>
          <Subheader>{title}</Subheader>
          {data.map(item => (
            <div key={item._id}>
              <ListItem
                primaryText={
                  type === 'historial' ? `Del ${moment(item.initDate).utc().format('D MMMM [de] YYYY')} al ${moment(item.finishDate).utc().format('D MMMM [de] YYYY')}` :
                    `Por aprobar del ${moment(item.initDate).utc().format('D MMMM [de] YYYY')} al ${moment(item.finishDate).utc().format('D MMMM [de] YYYY')}`
                }
                secondaryText={
                  <p>
                    Día solicitud: {moment(item.requestDay).utc().format('D MMMM [de] YYYY')} -
                    Días hábiles: {item.totalDays}
                  </p>
                }
                secondaryTextLines={1}
                leftIcon={(item.state === 'approved' && <Check color={green600} />) || (item.state === 'rejected' && <Reject color={red600} />) || <Wait color={orange600} />}
              />
              <Divider inset />
            </div>
          ))
          }
        </List>
      }
      {data && data.length === 0 && !isLoading &&
        <div
          style={{
            textAlign: 'center',
            padding: 20,
            color: '#757575',
            position: 'relative'
          }}
        >
          <p style={{ textAlign: 'left', color: '#757575', fontSize: 14 }}>Solicitudes</p>
          <IconButton
            style={{ position: 'absolute', top: 5, right: 10 }}
            tooltip="Solicitar vacación"
            iconStyle={{ color: '#039bdc' }}
            tooltipPosition="bottom-left"
            onClick={() => history.push('/vacations/create')}
          >
            <Add />
          </IconButton>
          <Empty style={{ height: 250, width: 250, color: '#757575' }} />
          <h3 style={{ fontWeight: 'normal' }}>No hay solicitudes pendientes</h3>
        </div>
      }
      {isLoading &&
        <div
          style={{
            textAlign: 'center',
            padding: 20,
            color: '#757575',
            position: 'relative',
            height: 300
          }}
        >
          <p style={{ textAlign: 'left', color: '#757575', fontSize: 14 }}>Solicitudes</p>
          <CircularProgress
            style={{
              alignSelf: 'center',
              position: 'absolute',
              top: '40%',
              left: '50%'
            }}
          />
        </div>
      }
    </Paper>
  );


export default History;
