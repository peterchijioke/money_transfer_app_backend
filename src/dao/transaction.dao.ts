import knex from '../db/db';

class TransactionDAO {
  async insertTransaction(transaction: {
    merchant_ref: string;
    trx_ref: string;
    account_name: string;
    account_number: string;
    currency: string;
    amount: number;
    status: string;
    response: string;
    user_id: number;
  }): Promise<void> {
    await knex('transactions').insert(transaction);
  }

async getTransactionsByUserId(userId: number, currentPage: number = 1, perPage: number = 50): Promise<any> {
  const offset = (currentPage - 1) * perPage;

  const transactions = await knex('transactions')
    .where({ user_id: userId })
    .limit(perPage)
    .offset(offset);

  const total = await knex('transactions')
    .where({ user_id: userId })
    .count('* as count')
    .first();

  const totalRecords:any = total?.count?? 0;
  const totalPages = Math.ceil(totalRecords / perPage);

  const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  const prevPage = currentPage > 1 ? currentPage - 1 : null;

  return {
    status: "success",
    message: "transactions retrieved successfully",
    data: {
      transactions,
      pagination: {
        perPage,
        currentPage,
        nextPage,
        prevPage,
        totalPages,
        total: totalRecords,
      },
    },
  };
}


  async updateTransactionStatus(
    trx_ref: string,
    status: string,
    data: {
      account_name: string;
      account_number: string;
      amount: number;
      currency: string;
      response: string;
    }
  ): Promise<void> {
    await knex('transactions')
      .where({ trx_ref })
      .update({
        status,
        account_name: data.account_name,
        account_number: data.account_number,
        amount: data.amount,
        currency: data.currency,
        response: data.response,
        updated_at: new Date(),  
      });
  }
}

export const transactionDAO = new TransactionDAO();
