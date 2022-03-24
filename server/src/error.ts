import { HttpException, HttpStatus } from '@nestjs/common';

export const errorMessage = (status: string, message: any) => {
    throw new HttpException(
        {
            status: HttpStatus[status],
            error: message,
        },
        HttpStatus[status],
    );
};
