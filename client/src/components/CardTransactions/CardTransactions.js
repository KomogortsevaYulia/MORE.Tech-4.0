// ** Custom Components
// import Avatar from '@components/avatar'

// ** Icons Imports
// import * as Icon from 'react-feather'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import style from './styleCardTransation.module.scss'

const CardTransactions = () => {
  const transactionsArr = [
    {
      title: 'Wallet',
      color: 'light-primary',
      subtitle: 'Starbucks',
      amount: '- $74',
      // Icon: Icon['Pocket'],
      down: true
    },
    {
      title: 'Bank Transfer',
      color: 'light-success',
      subtitle: 'Add Money',
      amount: '+ $480',
      // Icon: Icon['Check']
    },
    {
      title: 'Paypal',
      color: 'light-danger',
      subtitle: 'Add Money',
      amount: '+ $590',
      // Icon: Icon['DollarSign']
    },
    {
      title: 'Mastercard',
      color: 'light-warning',
      subtitle: 'Ordered Food',
      amount: '- $12',
      // Icon: Icon['CreditCard'],
      down: true
    },
    {
      title: 'Transfer',
      color: 'light-info',
      subtitle: 'Refund',
      amount: '+ $98',
      // Icon: Icon['TrendingUp']
    }
  ]

  const renderTransactions = () => {
    return transactionsArr.map(item => {
      return (
        <div key={item.title} className={`${style['transaction-item']} `}>
          <div className='d-flex'>
            <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdownMenuLink"
              role="button">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp" class="rounded-circle"
                height="22" alt="Avatar" loading="lazy" />
            </a>
            <div>
              <h6 className='transaction-title'>{item.title}</h6>
              <small>{item.subtitle}</small>
            </div>
          </div>
          <div className={`fw-bolder ${item.down ? 'text-danger' : 'text-success'}`}>{item.amount}</div>
        </div>
      )
    })
  }

  return (
    <Card className='card-transaction w-25'>
      <CardHeader>
        <CardTitle tag='h4'>Transactions</CardTitle>
        {/* <Icon.MoreVertical size={18} className='cursor-pointer' /> */}
      </CardHeader>
      <CardBody>{renderTransactions()}</CardBody>
    </Card>
  )
}

export default CardTransactions
